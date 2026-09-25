import "dotenv/config";
import { aiAdapter, type Message } from "../../lib/ai/index.js";
import { judgePrompt, systemPrompt, testerPrompt } from "./prompts.js";

const turnsArg = process.argv.indexOf("--turns");
const TURNS = turnsArg > -1 ? Number(process.argv[turnsArg + 1]) : 8;

interface Verdict {
  type: string;
  verdict: "pass" | "fail";
  reason: string;
}

async function nextQuestion(transcript: Message[]): Promise<string> {
  // The tester sees the conversation with roles flipped: its own questions are "assistant" turns.
  const flipped: Message[] = transcript.map((m) => ({
    role: m.role === "user" ? "assistant" : "user",
    content: m.content,
  }));
  const messages: Message[] = flipped.length ? flipped : [{ role: "user", content: "Start." }];
  return (await aiAdapter.sendMessage(messages, testerPrompt())).trim();
}

async function judge(question: string, answer: string): Promise<Verdict> {
  const raw = await aiAdapter.sendMessage(
    [{ role: "user", content: `Question: ${question}\n\nBot answer: ${answer}` }],
    judgePrompt()
  );
  try {
    return JSON.parse(raw.slice(raw.indexOf("{"), raw.lastIndexOf("}") + 1)) as Verdict;
  } catch {
    return { type: "?", verdict: "fail", reason: `Unparseable judge output: ${raw}` };
  }
}

async function main() {
  const transcript: Message[] = [];
  const results: Verdict[] = [];

  for (let i = 1; i <= TURNS; i++) {
    const question = await nextQuestion(transcript);
    transcript.push({ role: "user", content: question });

    const answer = await aiAdapter.sendMessage(transcript, systemPrompt());
    transcript.push({ role: "assistant", content: answer });

    const result = await judge(question, answer);
    results.push(result);

    console.log(`\n#${i} [${result.type}] ${result.verdict.toUpperCase()}`);
    console.log(`Q: ${question}`);
    console.log(`A: ${answer}`);
    console.log(`Judge: ${result.reason}`);
  }

  const passed = results.filter((r) => r.verdict === "pass").length;
  console.log(`\n=== ${passed}/${results.length} passed ===`);
  process.exit(passed === results.length ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
