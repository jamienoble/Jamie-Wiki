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
        // Palette usage: backgrounds and text follow palette rules for visibility
        lightMode: {
          light: "#F5E9D4",        // Sand (background)
          lightgray: "#E9DCC3",    // Clay (background/menus)
          gray: "#F3F0E7",         // Linen (background/menus)
          darkgray: "#3A3A32",     // Charcoal (menu on Soil)
          dark: "#1B2B22",         // Forest Night (text on light bg)
          text: "#1B2B22",         // Forest Night (main text)
          secondary: "#4C7A5D",    // Fern (UI highlights)
          tertiary: "#C97D60",     // Terracotta (accents/warnings)
          highlight: "rgba(108,138,123,0.15)", // Riverstone (highlight)
          textHighlight: "#D9A44188", // Ochre (highlighted text)
        },
        darkMode: {
          light: "#1B2B22",        // Forest Night (background)
          lightgray: "#233024",    // Moss (menu/overlay on Forest Night)
          gray: "#3A3A32",         // Charcoal (menu/overlay on Soil)
          darkgray: "#2E2217",     // Soil (background alt)
          dark: "#F5E9D4",         // Sand (text on dark bg)
          text: "#F5E9D4",         // Sand (main text)
          secondary: "#4C7A5D",    // Fern (UI highlights)
          tertiary: "#C97D60",     // Terracotta (accents/warnings)
          highlight: "rgba(108,138,123,0.15)", // Riverstone (highlight)
          textHighlight: "#D9A44188", // Ochre (highlighted text)
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
