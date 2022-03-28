import { Grid, Button } from "@material-ui/core";
import { Formik, Form, Field } from "formik";

import {
  DiagnosisSelection,
  TextField,
  EntryTypeSelection,
  NumberField
} from "../../components/FormField";

import { useStateValue } from "../../state";
import {
  EntryType,
  HealthCheckRating,
  EntryFormValues
} from "../../types";


interface Props {
  onSubmit: (value: EntryFormValues) => void;
  onCancel: () => void;
}

const addEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <>
      <Formik
        initialValues={{
          date: '',
          type: EntryType.Hospital,
          specialist: '',
          diagnosisCodes: [],
          description: '',
          discharge: {
            date: '',
            criteria: '',
          },
          employerName: '',
          healthCheckRating: HealthCheckRating.Healthy,
          sickLeave: {
            startDate: '',
            endDate: '',
          },
        }}
        onSubmit={onSubmit}
        validate={(values) => {
          const requiredError = "Field is required";
          const errors: { [field: string]: string } = {};
          if (!values.date) {
            errors.date = requiredError;
          }
          if (!values.specialist) {
            errors.specialist = requiredError;
          }
          if (!values.description) {
            errors.description = requiredError;
          }
          if (!values.type) {
            errors.type = requiredError;
          }
          if (values.type === EntryType.Hospital) {
            if (!values.discharge.date || !values.discharge.criteria) {
              errors.discharge = requiredError;
            }
          }
          if (values.type === EntryType.OccupationalHealthcare) {
            if (!values.employerName) {
              errors.employerName = requiredError;
            }
          }
          return errors;
        }}
      >
        {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
          return (
            <Form>
              <EntryTypeSelection
                entryTypes={Object.values(EntryType)}
              />
              <Field
                label="Date"
                placeholder="Date"
                name="date"
                component={TextField}
              />
              <Field
                label="Specialist"
                placeholder="Specialist"
                name="specialist"
                component={TextField}
              />
              <Field
                label="Description"
                placeholder="Description"
                name="description"
                component={TextField}
              />
              <DiagnosisSelection
                diagnoses={diagnoses}
                setFieldTouched={setFieldTouched}
                setFieldValue={setFieldValue}
              />
              {values.type === EntryType.HealthCheck && (
                <Field
                  name='healthCheckRating'
                  label='Health Check Rating'
                  min={0}
                  max={3}
                  component={NumberField}
                />
              )}
              {values.type === EntryType.Hospital && (
                <>
                  <Field
                    label="Date of discharge"
                    placeholder="YYYY-MM-DD"
                    name="discharge.date"
                    component={TextField}
                  />
                  <Field
                    label="Criteria"
                    placeholder="Criteria"
                    name="discharge.criteria"
                    component={TextField}
                  />
                </>
              )}
              {values.type === EntryType.OccupationalHealthcare && (
                <>
                  <Field
                    label="Employer name"
                    placeholder="Employer name"
                    name="employerName"
                    component={TextField}
                  />

                  <Field
                    label="Sick leave start"
                    placeholder="YYYY-MM-DD"
                    name="sickLeave.startDate"
                    component={TextField}
                  />
                  <Field
                    label="Sick leave end"
                    placeholder="YYYY-MM-DD"
                    name="sickLeave.endDate"
                    component={TextField}
                  />
                </>
              )}
              <Grid>
                <Grid item>
                  <Button
                    color="secondary"
                    variant="contained"
                    style={{ float: "left" }}
                    type="button"
                    onClick={onCancel}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    style={{
                      float: "right",
                    }}
                    type="submit"
                    variant="contained"
                    disabled={!dirty || !isValid}
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default addEntryForm;
