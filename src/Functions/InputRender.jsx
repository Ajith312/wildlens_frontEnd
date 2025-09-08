import Checkbox from "Components/Input/Checkbox";
import Input from "Components/Input/Input";
import ReactDropdownSelect from "Components/Input/ReactDropdownSelect";
import SelectBox from "Components/Input/SelectBox";
import Textbox from "Components/Input/textbox";
import { Fragment } from "react";


const renderNormalSelect = (ipVal) => (
  <SelectBox
    selectOptions={ipVal?.options}
    value={ipVal?.value}
    change={ipVal?.change}
    label={ipVal?.name}
    labelClassName="text-secondary mb-0 fs-14"
    mandatory={ipVal?.isMandatory}
    disableSelectBox={ipVal?.disabled}
    className={`rounded custom-select ${ipVal?.className}`}
  />
)


const renderReactDropdownSelect = (ipVal) => (
  <ReactDropdownSelect
    multi={ipVal?.multi}
    name={ipVal?.name}
    isMandatory={ipVal?.isMandatory}
    options={ipVal?.options}
    labelField="label"
    valueField="label"
    create={ipVal?.create}
    value={ipVal?.value}
    change={ipVal?.change}
    className={ipVal?.className}
    disabled={ipVal?.disabled}
  />
)


const renderFileInput = (ipVal) => (
  <Fragment>
    <div
      className={`cursor-pointer ${ipVal?.divClassName} ${
        ipVal?.value?.length >= ipVal?.fileLength ? "pe-none" : ""
      }`}
      onClick={() => document.getElementById("file_upload").click()}
    >
      <Input
        type={ipVal?.type}
        change={ipVal?.change}
        label={ipVal?.name}
        labelClassName="text-secondary mb-0 fs-14"
        mandatory={ipVal?.isMandatory}
        className={`d-none ${ipVal?.inputClassName}`}
        htmlFor="file_upload"
        multiple={true}
        inputError={ipVal?.Err}
        disabled={ipVal?.disabled}
        accept={ipVal?.accept}
      />

      <div className={`border py-2 rounded-2 col-12 text-center ${ipVal?.className}`}>
        <span className="me-2">{Icons?.fileUploadIcon}</span>
        <span className="text-secondary fs-15">
          {ipVal?.value?.length >= ipVal?.fileLength
            ? `Only ${ipVal?.fileLength} ${ipVal?.name} can be selectable`
            : `Click here to choose image`}
        </span>
      </div>
    </div>

    <div className="mt-4 w-100">
      {ipVal?.value?.map((data) => {
        const { id, name: filename, fileimage, size: filesize } = data;
        return (
          <div className="file-atc-box w-100" key={id}>
            {filename.match(/\.(jpg|jpeg|png|gif|svg|ods)$/i) ? (
              <div className="file-image">
                <img src={fileimage} alt="" />
              </div>
            ) : (
              <div className="file-image">
                <i className="far fa-file-alt"></i>
              </div>
            )}
            <div className="file-detail row">
              <h6>{filename}</h6>
              <div className="col-9">
                <p>
                  <span>Size : {filesize}</span>
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </Fragment>
)


const renderTextInput = (ipVal) => (
  <Input
    type={ipVal?.type} 
    value={ipVal?.value}
    change={ipVal?.change}
    keyDown={ipVal?.keyDown}
    label={ipVal?.name}
    ref={ipVal?.ref}
    labelClassName={`text-secondary fw-bold  mb-0 fs-14 ${ipVal?.labelClassName}`}
    mandatory={ipVal?.isMandatory}
    inputError={ipVal?.Err}
    disabled={ipVal?.disabled}
    eyeFunction={ipVal?.eyeFunction}
    eyeIcon={ipVal?.eyeIcon}
    className={ipVal?.className}
    placeholder={ipVal?.placeholder}
    min={ipVal?.min || null}
    max={ipVal?.max || null}
  />
)



const renderCheckbox = (ipVal) => (
  <Checkbox
    formType={ipVal?.type}
    formLabel={ipVal?.name}
    formClassName="text-secondary fw-bold  mb-0 fs-14"
    formId={ipVal?.name}
    formName="radio"
    change={ipVal?.change}
    formChecked={ipVal?.checked}
    formValue={ipVal?.value}
  />
)


const renderTextbox = (ipVal) => (
  <Textbox
    value={ipVal?.value}
    change={ipVal?.change}
    cols={10}
    rows={3}
    className={`${ipVal?.className}`}
    label={ipVal?.name}
    labelClassName="text-secondary fw-bold mb-0 fs-14"
    mandatory={ipVal?.isMandatory}
    inputError={ipVal?.Err}
    disabled={ipVal?.disabled}
  />
)


export const InputRenderers = {
  normal_select: renderNormalSelect,
  react_dropdown_select: renderReactDropdownSelect,
  file: renderFileInput,
  text: renderTextInput,
  date: renderTextInput,
  number: renderTextInput,
  Checkbox: renderCheckbox,
  textbox: renderTextbox,
};
