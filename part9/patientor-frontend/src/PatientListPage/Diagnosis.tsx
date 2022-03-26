import axios from "axios";
import { useEffect, useState } from "react";
import { apiBaseUrl } from "../constants";
import { Diagnose } from "../types";

export default function Diagnosis({ code }: { code: string }) {
  const [diagnose, setDiagnose] = useState<Diagnose>();

  useEffect(() => {
    const fetchDiagnose = async (code: string) => {
      const res = await axios.get<Diagnose>(`${apiBaseUrl}/diagnoses/${code}`);
      setDiagnose(res.data);
    };

    void fetchDiagnose(code);
  }, []);

  return (
    <li>
      {code} {diagnose?.name}
    </li>
  );
}
