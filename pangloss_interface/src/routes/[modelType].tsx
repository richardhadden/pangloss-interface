import { RouteSectionProps } from "@solidjs/router";

export default function BlogLayout(props: RouteSectionProps) {
  return <div class="px-32 mt-32">{props.children}</div>;
}
