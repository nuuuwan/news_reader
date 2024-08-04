import { Component } from "react";
//
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import ListIcon from "@mui/icons-material/List";

import FirstPageIcon from "@mui/icons-material/FirstPage";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import LastPageIcon from "@mui/icons-material/LastPage";

//
import { ArticleMetadata } from "../../nonview/core";
//
import { ArticleMetadataListView } from "../../view/molecules";
import { ArticleView } from "../organisms";

//
export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "index",
      articleMetadataList: undefined,
      activeArticleIndex: 0,
    };
  }

  async componentDidMount() {
    const articleMetadataList = await ArticleMetadata.listAll();
    this.setState({ articleMetadataList });
  }

  setActiveArticleIndex(activeArticleIndex) {
    this.setState({ mode: "article", activeArticleIndex });
  }

  gotoArticleIndex() {
    this.setState({ mode: "index" });
  }

  gotoPreviousArticle() {
    let { activeArticleIndex } = this.state;

    const newActiveArticleIndex = Math.max(0, activeArticleIndex - 1);
    console.debug({ activeArticleIndex, newActiveArticleIndex });
    this.setState({
      activeArticleIndex: newActiveArticleIndex,
      mode: "article",
    });
  }

  gotoNextArticle() {
    let { activeArticleIndex, articleMetadataList } = this.state;

    const newActiveArticleIndex = Math.min(
      articleMetadataList.length - 1,
      activeArticleIndex + 1
    );
    console.debug({ activeArticleIndex, newActiveArticleIndex });
    this.setState({
      activeArticleIndex: newActiveArticleIndex,
      mode: "article",
    });
  }

  gotoFirstArticle() {
    this.setState({ activeArticleIndex: 0, mode: "article" });
  }

  gotoLastArticle() {
    this.setState({
      activeArticleIndex: this.state.articleMetadataList.length - 1,
      mode: "article",
    });
  }

  renderBody() {
    const { mode, articleMetadataList, activeArticleIndex } = this.state;

    if (mode === "index") {
      return (
        <ArticleMetadataListView
          articleMetadataList={articleMetadataList}
          setActiveArticleIndex={this.setActiveArticleIndex.bind(this)}
        />
      );
    } else {
      const articleMetadata = articleMetadataList[activeArticleIndex];
      return (
        <Box key={activeArticleIndex}>
          <ArticleView articleMetadata={articleMetadata} />
        </Box>
      );
    }
  }

  renderFooter() {
    return (
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          index: 1000,
        }}
      >
        <BottomNavigation sx={{ paddingBottom: 1, backgroundColor: "#f8f8f8" }}>
          <BottomNavigationAction
            onClick={this.gotoFirstArticle.bind(this)}
            icon={<FirstPageIcon />}
          ></BottomNavigationAction>
          <BottomNavigationAction
            onClick={this.gotoPreviousArticle.bind(this)}
            icon={<NavigateBeforeIcon />}
          ></BottomNavigationAction>
          <BottomNavigationAction
            onClick={this.gotoNextArticle.bind(this)}
            icon={<NavigateNextIcon />}
          ></BottomNavigationAction>
          <BottomNavigationAction
            onClick={this.gotoLastArticle.bind(this)}
            icon={<LastPageIcon />}
          ></BottomNavigationAction>{" "}
          <BottomNavigationAction
            onClick={this.gotoArticleIndex.bind(this)}
            icon={<ListIcon />}
          ></BottomNavigationAction>
        </BottomNavigation>
      </Box>
    );
  }

  render() {
    return (
      <Box>
        {this.renderBody()}
        {this.renderFooter()}
      </Box>
    );
  }
}
