import Diagnosis from "./Diagnosis";

export default function DiagnoseList({
  diagnosisCodes,
}: {
  diagnosisCodes: string[];
}) {
  return (
    <ul>
      {diagnosisCodes.map((code) => (
        <Diagnosis key={code} code={code} />
      ))}
    </ul>
  );
}
