export type SectionTypes = "code" | "text";

export interface Section {
  id: string;
  type: SectionTypes;
  content: string;
}
