export default function PersonForm({ values, onChanges, addName }) {
  const { newName, newPhone } = values;
  const { nameOnChange, phoneOnChange } = onChanges;
  return (
    <form>
      <div>
        name: <input value={newName} onChange={nameOnChange} />
      </div>
      <div>
        number: <input value={newPhone} onChange={phoneOnChange} />
      </div>
      <div>
        <button type="submit" onClick={addName}>
          add
        </button>
      </div>
    </form>
  );
}
