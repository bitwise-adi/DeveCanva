/**
 * Global MDX component overrides.
 * Required by @next/mdx in App Router — won't compile without this file.
 * Custom blog components (KeyMetric, Callout, etc.) are imported directly
 * in each .mdx file, so they don't need to be registered here.
 */
const components = {}

export function useMDXComponents() {
  return components
}
