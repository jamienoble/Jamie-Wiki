import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Quartz 4",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "quartz.jzhao.xyz",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#f5f3e7",        // warm off-white
          lightgray: "#e6dcc3",    // light tan
          gray: "#b7a16a",         // muted brown
          darkgray: "#6b5e3c",     // deep brown
          dark: "#3e2f1c",         // dark brown
          secondary: "#7a9c5c",    // warm green
          tertiary: "#b7a16a",     // muted brown
          highlight: "rgba(122, 156, 92, 0.15)", // green highlight
          textHighlight: "#e6dcc388", // light tan highlight
        },
        darkMode: {
          light: "#2e2a24",        // dark brown
          lightgray: "#4b473a",    // muted brown
          gray: "#7a9c5c",         // warm green
          darkgray: "#b7a16a",     // muted brown
          dark: "#f5f3e7",         // warm off-white for text
          secondary: "#a3c586",    // lighter green
          tertiary: "#b7a16a",     // muted brown
          highlight: "rgba(163, 197, 134, 0.15)", // green highlight
          textHighlight: "#7a9c5c88", // green highlight
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
