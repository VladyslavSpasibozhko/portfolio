import type { JourneyCalloutBlock } from "@global-types/journey";
import { BorderedContainer } from "@components/atoms/BorderedContainer";
import { Typography } from "@components/atoms/Typography";
import { Link } from "@components/atoms/Link";
import { Icon, isIconName } from "@components/atoms/Icon";

interface CalloutBlockProps {
  block: JourneyCalloutBlock;
}

export function CalloutBlock({ block }: CalloutBlockProps) {
  return (
    <BorderedContainer className="w-full flex items-center gap-8 md:gap-6 lg:gap-14 xl:gap-16">
      <div>
        {isIconName(block.icon) && (
          <Icon name={block.icon} size="4xl" className="text-text-white" />
        )}
      </div>
      <Typography
        tag="p"
        className="italic text-12 md:text-16 xl:text-18 2xl:text-20 3xl:text-28 text-text-300"
      >
        {block.text}
        {block.link && (
          <>
            {" "}
            <Link href={block.link.href} className="not-italic text-text-sky">
              {block.link.label}
            </Link>
          </>
        )}
      </Typography>
    </BorderedContainer>
  );
}
