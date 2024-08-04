import { Component } from "react";
//
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  TextField,
} from "@mui/material";
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
      searchText: undefined,
    };
  }

  async componentDidMount() {
    const articleMetadataList = await ArticleMetadata.listAll();
    this.setState({ articleMetadataList });
  }

  setSearchText(searchText) {
    this.setState({ searchText });
  }

  setActiveArticleIndex(activeArticleIndex) {
    this.setState({ mode: "article", activeArticleIndex });
    window.scrollTo(0, 0);
  }

  gotoArticleIndex() {
    this.setState({ mode: "index" });
  }

  gotoPreviousArticle() {
    let { activeArticleIndex } = this.state;

    const newActiveArticleIndex = Math.max(0, activeArticleIndex - 1);

    this.setActiveArticleIndex(newActiveArticleIndex);
  }

  gotoNextArticle() {
    let { activeArticleIndex, articleMetadataList } = this.state;

    const newActiveArticleIndex = Math.min(
      articleMetadataList.length - 1,
      activeArticleIndex + 1
    );
    this.setActiveArticleIndex(newActiveArticleIndex);
  }

  gotoFirstArticle() {
    this.setActiveArticleIndex(0);
  }

  gotoLastArticle() {
    this.setActiveArticleIndex(this.state.articleMetadataList.length - 1);
  }

  renderBody() {
    const { mode, articleMetadataList, activeArticleIndex, searchText } =
      this.state;

    if (mode === "index") {
      return (
        <ArticleMetadataListView
          articleMetadataList={articleMetadataList}
          setActiveArticleIndex={this.setActiveArticleIndex.bind(this)}
          searchText={searchText}
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
    const { mode } = this.state;
    const onChangeSearchText = function (e) {
      const searchText = e.target.value;
      this.setSearchText(searchText);
    }.bind(this);

    return (
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          index: 1000,
          backgroundColor: "#f8f8f8",
        }}
      >
        {mode === "index" ? (
          <TextField
            fullWidth
            placeholder="Input Search Text"
            onChange={onChangeSearchText}
          />
        ) : null}
        <BottomNavigation sx={{ paddingBottom: 1 }}>
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
