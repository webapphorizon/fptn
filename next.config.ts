import createNextIntlPlugin from "next-intl/plugin";

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */

/** @type {import("next").NextConfig} */
const nextConfig = {
  // output: "standalone",
  // trailingSlash: true,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
