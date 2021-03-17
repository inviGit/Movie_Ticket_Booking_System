import React, { Component } from "react";

export class Form extends Component {
  render() {
    const {
      formObject,
      title,
      onFormValueChange,
      onSubmit,
      onCancel,
    } = this.props;
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <h1> {title} </h1>
              <div className="card-body">
                {Object.keys(formObject).map(function (formValue) {
                  let label = formValue.charAt(0).toUpperCase();
                  for (let i = 1; i < formValue.length; i++) {
                    let char = formValue.charAt(i);
                    if (char === char.toUpperCase()) {
                      label = label.concat(" ", char);
                    } else {
                      label = label.concat(char);
                    }
                  }
                  return (
                    <div key={formValue}>
                      <label> {label} </label>
                      {typeof formObject[formValue] === "object" ? (
                        <div className="input-group mb-3">
                          <div className="input-group-prepend">
                            <label
                              className="input-group-text"
                              htmlFor="inputGroupSelect01"
                            >
                              Options
                            </label>
                          </div>
                          <select
                            className="custom-select"
                            id="inputGroupSelect01"
                            name={formValue}
                            onChange={onFormValueChange}
                          >
                            {formObject[formValue].map((x) => {
                              return <option key={x}>{x}</option>;
                            })}
                          </select>
                        </div>
                      ) : (
                        <input
                          className="form-control"
                          placeholder={formValue}
                          name={formValue}
                          value={formObject[formValue]}
                          onChange={onFormValueChange}
                        />
                      )}
                    </div>
                  );
                })}
                <button
                  className="btn btn-success"
                  onClick={() => onSubmit()}
                  style={{ marginLeft: "10px" }}
                >
                  save
                </button>
                <button
                  className="btn btn-danger"
                  onClick={()=>onCancel() }
                  style={{ marginLeft: "10px" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;

