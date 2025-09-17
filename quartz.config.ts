import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Jamie's Wiki",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-GB",
    baseUrl: "quartz.jzhao.xyz",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "IBM Plex Mono",
        body: "IBM Plex Mono",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#ECEFF4",        // Snow Storm
          lightgray: "#E5E9F0",   // Snow Storm
          gray: "#D8DEE9",        // Snow Storm
          darkgray: "#81A1C1",    // Frost
          dark: "#5E81AC",        // Frost
          secondary: "#8FBCBB",   // Frost
          tertiary: "#88C0D0",    // Frost
          highlight: "rgba(136, 192, 208, 0.15)", // Frost highlight
          textHighlight: "#A3BE8C88", // Aurora highlight
        },
        darkMode: {
          light: "#2E3440",        // Polar Night
          lightgray: "#3B4252",    // Polar Night
          gray: "#434C5E",         // Polar Night
          darkgray: "#4C566A",     // Polar Night
          dark: "#ECEFF4",         // Snow Storm for text
          secondary: "#A3BE8C",    // Aurora
          tertiary: "#B48EAD",     // Aurora
          highlight: "rgba(163, 190, 140, 0.15)", // Aurora highlight
          textHighlight: "#88C0D088", // Frost highlight
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
