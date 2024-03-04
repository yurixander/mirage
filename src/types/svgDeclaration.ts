declare module "*.svg" {
  import React = require("react")

  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>

  export default content
}
