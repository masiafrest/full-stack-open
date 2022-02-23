import { useState } from "react";

const Statistics = ({ good, neutral, bad }) => {
  const sum = good + neutral + bad;
  return (
    <>
      <h2>statistics</h2>
      {good > 0 || neutral > 0 || bad > 0 ? (
        <table>
          <tbody>
            <StatisticLine text={"good"} value={good} />
            <StatisticLine text={"neutral"} value={neutral} />
            <StatisticLine text={"bad"} value={bad} />
            <StatisticLine text={"all"} value={sum} />
            <StatisticLine text={"average"} value={sum / 3} />
            <StatisticLine
              text={"positive"}
              value={`${(good / sum) * 100} %`}
            />
          </tbody>
        </table>
      ) : (
        <p>No feedback given</p>
      )}
    </>
  );
};

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Button = ({ onClick, children }) => (
  <button onClick={onClick}>{children}</button>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)}>good</Button>
      <Button onClick={() => setNeutral((prev) => prev + 1)}>neutral</Button>
      <Button onClick={() => setBad((prev) => prev + 1)}>bad</Button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
