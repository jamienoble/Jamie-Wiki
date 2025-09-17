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
          light: "#F5E9D4",        // Sand
          lightgray: "#E9DCC3",    // Clay
          gray: "#F3F0E7",         // Linen
          darkgray: "#E6D8B6",     // Wheat
          dark: "#1B2B22",         // Forest Night
          secondary: "#4C7A5D",    // Fern
          tertiary: "#C97D60",     // Terracotta
          highlight: "rgba(108,138,123,0.15)", // Riverstone
          textHighlight: "#D9A44188", // Ochre (with opacity)
        },
        darkMode: {
          light: "#1B2B22",        // Forest Night (background)
          lightgray: "#233024",    // Moss
          gray: "#3A3A32",         // Charcoal
          darkgray: "#2E2217",     // Soil
          dark: "#F5E9D4",         // Sand (text)
          secondary: "#4C7A5D",    // Fern
          tertiary: "#C97D60",     // Terracotta
          highlight: "rgba(108,138,123,0.15)", // Riverstone
          textHighlight: "#D9A44188", // Ochre (with opacity)
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
