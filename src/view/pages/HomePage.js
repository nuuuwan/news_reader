import { Component } from "react";
//
import { ArticleMetadata } from "../../nonview/core";
//
import { ArticleMetadataListView } from "../../view/molecules";
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
    return (
      <ArticleMetadataListView articleMetadataList={articleMetadataList} />
    );
  }
}
