import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface Props {
  sections: {
    title: string;
    content: React.ReactNode;
  }[];
}

export default function ExpandableSection({ sections }: Props) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {sections.map((section, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>
            <span className="font-bold">{section.title}</span>
          </AccordionTrigger>
          <AccordionContent>{section.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
