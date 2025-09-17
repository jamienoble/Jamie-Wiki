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
          light: "#f8f8f2",        // Background (Dracula Foreground, but light)
          lightgray: "#e6e6e6",    // Custom light gray
          gray: "#44475a",         // Current Line (for borders, etc.)
          darkgray: "#6272a4",     // Comment (for secondary text)
          dark: "#282a36",         // Text (Dracula Background, but dark for contrast)
          secondary: "#8be9fd",    // Cyan
          tertiary: "#ffb86c",     // Orange
          highlight: "rgba(189, 147, 249, 0.15)", // Purple highlight
          textHighlight: "#ff79c688", // Pink highlight
        },
        darkMode: {
          light: "#282a36",        // Background
          lightgray: "#44475a",    // Current Line
          gray: "#6272a4",         // Comment
          darkgray: "#bd93f9",     // Purple
          dark: "#f8f8f2",         // Foreground for text
          secondary: "#50fa7b",    // Green
          tertiary: "#ffb86c",     // Orange
          highlight: "rgba(80, 250, 123, 0.15)", // Green highlight
          textHighlight: "#f1fa8c88", // Yellow highlight
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
