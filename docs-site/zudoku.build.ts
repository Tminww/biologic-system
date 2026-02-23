import type { ZudokuBuildConfig } from "zudoku";
import rehypeMermaid from "rehype-mermaid";

const buildConfig: ZudokuBuildConfig = {
  rehypePlugins: (defaultPlugins) => [
    [rehypeMermaid, { strategy: "inline-svg" }],
    ...defaultPlugins,
  ],
};

export default buildConfig;
