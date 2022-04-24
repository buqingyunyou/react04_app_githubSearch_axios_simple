import "./App.css";
import axios from "axios";
import React from "react";

export default class App extends React.Component {
  state = {
    isLoading: false,
    repo: {},
  };
  // 发送ajax请求(在勾子中发送)
  componentDidMount() {
    // 发送请求，将isLoading修改为true
    this.setState({
      isLoading: true,
    });

    axios
      .get("https://api.github.com/search/repositories?q=r&sort=stars")
      .then((res) => {
        // 返回的数据  res.data.items[0]
        const { name, html_url } = res.data.items[0];
        this.setState({
          isLoading: false,
          repo: { name, html_url },
        });
      })
      .catch((err) => {
        alert("网络错误");
        console.log(err);
      });
  }

  render() {
    const { isLoading, repo } = this.state;
    if (isLoading) {
      return <h1>loading...</h1>;
    }

    return (
      <h2>
        most star repo is<a href={repo.html_url}>{repo.name}</a>
      </h2>
    );
  }
}
