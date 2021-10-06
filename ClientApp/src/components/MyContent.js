import React, { Component, useEffect, useState } from "react";
import { Card, Button, Row, Col, Modal } from "react-bootstrap";
import "./MyContent.css";

function MyContent() {
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

  useEffect(() => {
    fetch("api")
      .then((response) => response.json())
      .then((json) => setVideos(json));
  }, []);

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

  return (
    <div className="maindiv">
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
          <div class="btn-close-align">
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MyContent;
