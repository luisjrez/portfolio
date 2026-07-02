const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefixes a site-root-relative path with the deployment base path. */
export function withBasePath(path: string): string {
  return `${BASE_PATH}${path}`;
}
