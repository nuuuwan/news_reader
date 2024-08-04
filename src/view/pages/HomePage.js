import { Component } from "react";
import { Box } from "@mui/material";
//
import { ArticleMetadata } from "../../nonview/core";
//
export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { articleMetadataList: undefined };
  }

  async componentDidMount() {
    const articleMetadataList = await ArticleMetadata.listAll();
    this.setState({ articleMetadataList });
  }

  render() {
    const { articleMetadataList } = this.state;
    if (!articleMetadataList) {
      return "Loading...";
    }
    return <Box>{JSON.stringify(articleMetadataList)}</Box>;
  }
}
