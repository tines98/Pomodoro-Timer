const { useEffect, useState } = React;


const BreakSession = props => {
  return /*#__PURE__*/(
    React.createElement("div", { className: "break-session" }, /*#__PURE__*/
    React.createElement("h1", { id: props.labelId }, props.title), /*#__PURE__*/
    React.createElement("div", { className: "inc-dec" }, /*#__PURE__*/
    React.createElement("button", {
      className: "inc-dec-button",
      id: props.incrementId,
      onClick: props.onClick,
      value: "+" }, "+"), /*#__PURE__*/


    React.createElement("div", {
      id: props.lengthId },
    props.length), /*#__PURE__*/

    React.createElement("button", {
      className: "inc-dec-button",
      id: props.decrementId,
      onClick: props.onClick,
      value: "-" }, "-"))));





};

const CountDownTimer = props => {
  const [seconds, setSeconds] = useState(props.length);
  const [isActive, setIsActive] = useState(false);
  function toggle() {
    setIsActive(!isActive);
  }
  function reset() {
    setSeconds(props.length);
    setIsActive(false);
  }
  useEffect(() => {
    let interval = null;
    if (isActive) {
      if (seconds === 0) {
        alert("got here beofre");
        this.props.onCompletion();
      } else
      {
        interval = setInterval(() => {
          setSeconds(seconds => seconds - 1);
        }, 1000);
      }
    } else
    if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return /*#__PURE__*/(
    React.createElement("div", { className: "timer" }, /*#__PURE__*/
    React.createElement("h1", { id: "timer-label" }, props.label), /*#__PURE__*/
    React.createElement("h2", { id: "timer-left" }, seconds), /*#__PURE__*/
    React.createElement("div", { className: "timer-controls" }, /*#__PURE__*/
    React.createElement("button", {
      id: "toggle",
      onClick: toggle },
    isActive ? "pause" : "start"), /*#__PURE__*/

    React.createElement("button", { id: "stop" }, "stop"), /*#__PURE__*/
    React.createElement("button", {
      id: "reset",
      onClick: reset }, "reset"))));





};

const App = () => {
  const [stage, setStage] = useState("session");
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [length, setLength] = useState(sessionLength * 60);
  const [seconds, setSeconds] = useState(length);
  const [isActive, setIsActive] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [audio, setAudio] = useState(null);

  function testButton() {
    setSeconds(3);
    setIsStarted(true);
    setIsActive(true);
  }
  function toggle() {
    if (!isStarted) {
      setSeconds(length);
      setIsStarted(true);
    }
    setIsActive(!isActive);
  }
  function reset() {
    audio.pause();
    audio.load();
    setBreakLength(5);
    setSessionLength(25);
    setLength(25 * 60);
    setStage("session");
    setSeconds(25 * 60);
    setIsActive(false);
    setIsStarted(false);
  }
  function nextStage() {
    audio.play();
    if (stage === "session") {
      setStage("break");
      setLength(breakLength * 60);
      setSeconds(breakLength * 60);
    } else
    if (stage === "break") {
      setStage("session");
      setLength(sessionLength * 60);
      setSeconds(sessionLength * 60);
    }
  }
  function clockify() {
    let minutes = Math.floor(seconds / 60);
    let second = seconds % 60;
    second = second < 10 ? '0' + second : second;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return minutes + ":" + second;
  }
  useEffect(() => {
    let interval = null;
    if (audio === null) {
      setAudio(document.getElementById("beep"));
    }
    if (isActive) {
      if (seconds === 0) {
        nextStage();
      } else
      {
        interval = setInterval(() => {
          setSeconds(seconds => seconds - 1);
        }, 1000);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);



  function setBreakLen(e) {
    if (e.target.value === '+' && breakLength < 60) {
      setBreakLength(breakLength => breakLength + 1);
      if (stage === 'break') {
        setLength((breakLength + 1) * 60);
        setSeconds(seconds => seconds + 60);
      }
    } else
    if (e.target.value === '-' && breakLength > 1) {
      setBreakLength(breakLength => breakLength - 1);
      if (stage === 'break') {
        setLength((breakLength - 1) * 60);
        setSeconds(seconds => seconds - 60);
      }
    }
  }

  function setSessionLen(e) {
    if (e.target.value === '+' && sessionLength < 60) {
      setSessionLength(sessionLength => sessionLength + 1);
      if (stage === 'session') {
        setLength((sessionLength + 1) * 60);
        setSeconds(seconds => seconds + 60);
      }
    } else
    if (e.target.value === '-' && sessionLength > 1) {
      setSessionLength(sessionLength => sessionLength - 1);
      if (stage === 'session') {
        setLength((sessionLength - 1) * 60);
        setSeconds(seconds => seconds - 60);
      }
    }
  }

  return /*#__PURE__*/(
    React.createElement("div", { className: "app" }, /*#__PURE__*/
    React.createElement("audio", { id: "beep", preload: "auto", src: "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" }), /*#__PURE__*/
    React.createElement("h1", null, breakLength, " ", sessionLength, " ", length, " ", isActive ? "true" : "false"), /*#__PURE__*/
    React.createElement("div", { className: "break-session-container" }, /*#__PURE__*/
    React.createElement(BreakSession, {
      title: "Break Length",
      labelId: "break-label",
      lengthId: "break-length",
      incrementId: "break-increment",
      decrementId: "break-decrement",
      onClick: setBreakLen,
      length: breakLength }), /*#__PURE__*/

    React.createElement(BreakSession, {
      title: "Session Length",
      labelId: "session-label",
      lengthId: "session-length",
      incrementId: "session-increment",
      decrementId: "session-decrement",
      onClick: setSessionLen,
      length: sessionLength })), /*#__PURE__*/


    React.createElement("div", { className: "timer" }, /*#__PURE__*/
    React.createElement("h1", { id: "timer-label" }, stage), /*#__PURE__*/
    React.createElement("h2", { id: "time-left" }, clockify()), /*#__PURE__*/
    React.createElement("div", { className: "timer-controls" }, /*#__PURE__*/
    React.createElement("button", {
      id: "start_stop",
      onClick: toggle },
    isActive ? "pause" : "start"), /*#__PURE__*/

    React.createElement("button", { id: "stop", onClick: testButton }, "stop"), /*#__PURE__*/
    React.createElement("button", {
      id: "reset",
      onClick: reset }, "reset")))));






};

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("app"));