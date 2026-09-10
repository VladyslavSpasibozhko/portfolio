import type { UseCase } from "@types";
import { Typography } from "@components/atoms/Typography";

interface UseCaseCardProps {
  useCase: UseCase;
}

export function UseCaseCard({ useCase }: UseCaseCardProps) {
  return (
    <div className="space-y-2">
      <Typography tag="p" className="font-semibold">
        {useCase.title}
      </Typography>
      <Typography tag="p" className="text-14">
        {useCase.description}
      </Typography>
    </div>
  );
}
