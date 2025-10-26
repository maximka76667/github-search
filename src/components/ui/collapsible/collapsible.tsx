/**
 * @fileoverview Collapsible component wrapper for Radix UI collapsible primitive.
 * Provides expandable/collapsible content sections with smooth animations.
 */

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

/**
 * Root collapsible component that manages expand/collapse state.
 * Wraps Radix UI's collapsible primitive with consistent data attributes.
 *
 * @param props - All props from Radix UI CollapsiblePrimitive.Root
 * @return {JSX.Element} The rendered collapsible container
 */
function Collapsible({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

/**
 * Trigger button that toggles the collapsible content visibility.
 *
 * @param props - All props from Radix UI CollapsiblePrimitive.CollapsibleTrigger
 * @return {JSX.Element} The rendered trigger button
 */
function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  );
}

/**
 * Content area that expands and collapses with animation.
 *
 * @param props - All props from Radix UI CollapsiblePrimitive.CollapsibleContent
 * @return {JSX.Element} The rendered collapsible content
 */
function CollapsibleContent({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      {...props}
    />
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
