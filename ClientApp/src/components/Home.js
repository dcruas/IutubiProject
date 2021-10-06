import React, { Component, useEffect, useState } from "react";
import { Card, Button, Row, Col, Modal, Form } from "react-bootstrap";
import "./Home.css";

function Home() {
  const [videos, setVideos] = useState([]);
  const [show, setShow] = useState(false);
  const [video, setVideo] = useState({
    youtubeID: null,
    title: null,
    description: null,
    kind: null,
    url: null,
    thumbnails: null,
  });

  function OpenModal(item) {
    var link;
    switch (item.kind) {
      case "youtube#video":
        link = "https://www.youtube.com/watch?v=" + item.youtubeID;
        break;
      case "youtube#channel":
        link = "https://www.youtube.com/c/" + item.title;
        break;
      case "youtube#playlist":
        link = "https://www.youtube.com/playlist?list=" + item.youtubeID;
        break;
      default:
        link = "";
        break;
    }
    setVideo({
      youtubeID: item.youtubeID,
      title: item.title,
      description: item.description,
      kind: item.kind,
      url: link,
      thumbnails: item.thumbnails,
    });
    setShow(true);
  }

  function Search() {
    var value = "";
    value = document.getElementById("txt_search").value;
    if (value.trim() == "") {
      alert("Digite algo no campo de busca");
    } else {
      fetch("api/" + value)
        .then((response) => response.json())
        .then((json) => setVideos(json));
    }
  }

  return (
    <div class="maindiv">
      <Form className="form-class" inline>
        <Row className="align-items-center">
          <Col xs="auto">
            <Form.Control
              id="txt_search"
              size="md"
              type="text"
              placeholder="Search"
              className="mr-sm2"
            />
          </Col>
          <Col xs="auto">
            <Button variant="outline-success" onClick={() => Search()}>
              Search
            </Button>
          </Col>
        </Row>
      </Form>{" "}
      <br /> <br />
      <div className="cardDiv">
        <Row xs={1} md={2} lg={3} className="g-4">
          {videos?.map((youtubeitem, index) => (
            <Col
              key={youtubeitem.youtubeID}
              index={index}
              style={{ marginBottom: "2rem" }}
            >
              <Card
                style={{ width: "18rem", height: "100%", innerHeight: "100%" }}
              >
                <Card.Img
                  className="card-img-size"
                  variant="top"
                  src={youtubeitem.thumbnails}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{youtubeitem.title}</Card.Title>
                  <Card.Text></Card.Text>
                  <div className="text-muted mt-auto">
                    <Button
                      variant="primary"
                      index={index}
                      onClick={() => OpenModal(youtubeitem)}
                    >
                      Show details
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <Modal
        dialogClassName="modal-width"
        show={show}
        onHide={() => setShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title> {video.title}</Modal.Title>
        </Modal.Header>

        <div class="div-modal-body">
          {video.kind === "youtube#video" && (
            <iframe
              class="embed-video"
              src={"https://www.youtube.com/embed/" + video.youtubeID}
              allowFullScreen
            ></iframe>
          )}
          {video.kind === "youtube#channel" && (
            <img src={video.thumbnails} width="360px" height="245px" />
          )}
          {video.kind === "youtube#playlist" && (
            <iframe
              class="embed-video"
              src={
                "https://www.youtube.com/embed/videoseries?list=" +
                video.youtubeID
              }
              allowFullScreen
            ></iframe>
          )}
        </div>

        <Modal.Footer>
          <div class="text-footer">
            {" "}
            <strong>Descrição: </strong>
            <br />
            {video.description} <br /> <br />
            <strong> Link: </strong>
            <a href={video.url}>{video.url}</a>{" "}
          </div>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Home;
