import { Component } from "react";
//
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  TextField,
} from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import RefreshIcon from "@mui/icons-material/Refresh";
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

  refresh() {
    localStorage.clear();
    window.location.reload();
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
            onClick={this.refresh.bind(this)}
            icon={<RefreshIcon />}
          ></BottomNavigationAction>
          <BottomNavigationAction
            onClick={this.gotoArticleIndex.bind(this)}
            icon={
              <ListIcon sx={{ color: mode === "index" ? "#eee" : "#000" }} />
            }
            disabled={mode === "index"}
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
