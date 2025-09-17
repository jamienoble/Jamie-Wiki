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
        // Earthy Palette mapped to Quartz keys and usage rules
        lightMode: {
          light: "#F5E9D4",        // Sand (page background)
          lightgray: "#E9DCC3",    // Clay (borders)
          gray: "#F3F0E7",         // Linen (graph links, heavier borders)
          darkgray: "#3A3A32",     // Charcoal (body text)
          dark: "#1B2B22",         // Forest Night (header text, icons)
          secondary: "#4C7A5D",    // Fern (link colour, current graph node)
          tertiary: "#6C8A7B",     // Riverstone (hover states, visited graph nodes)
          highlight: "rgba(108,138,123,0.15)", // Riverstone (internal link bg, highlighted text, code lines)
          textHighlight: "#E9DCC388", // Clay (markdown highlighted text background)
        },
        darkMode: {
          light: "#1B2B22",        // Forest Night (page background)
          lightgray: "#233024",    // Moss (borders)
          gray: "#3A3A32",         // Charcoal (graph links, heavier borders)
          darkgray: "#F5E9D4",     // Sand (body text)
          dark: "#E9DCC3",         // Clay (header text, icons)
          secondary: "#A3B18A",    // Sage (link colour, current graph node)
          tertiary: "#4C7A5D",     // Fern (hover states, visited graph nodes)
          highlight: "rgba(108,138,123,0.15)", // Riverstone (internal link bg, highlighted text, code lines)
          textHighlight: "#23302488", // Moss (markdown highlighted text background)
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
