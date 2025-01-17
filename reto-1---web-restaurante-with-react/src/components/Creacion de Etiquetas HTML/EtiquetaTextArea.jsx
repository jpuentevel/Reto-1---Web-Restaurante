import {
	faCheckCircle,
	faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import React, { useContext } from "react";
import CantidadContext from "../../contexts/Inputs/InputsContext";
import EtiquetaFontAwesomeIcon from "../FontAwesome/EtiquetaFontAwesomeIcon";
import { handleInputsChange } from "../Inputs/ValidacionCampos";

const EtiquetaTextArea = ({ objeto }) => {
	const { inputs, cargarCampos, campoValido } = useContext(CantidadContext);

	const inicializarTextArea = (valorInicial, nombreInput) => {
		if (inputs[nombreInput]?.valor === undefined) {
			cargarCampos(valorInicial, nombreInput, false, {
				error: false,
				error1: false,
			});
		}
	};
	if (objeto.textArea_CallComponentBool) {
		return (
			<>
				<div
					className={
						inputs[`${objeto.nameTextArea}_${objeto.id}`]?.error.error ===
							false &&
						inputs[`${objeto.nameTextArea}_${objeto.id}`]?.error.error1 ===
							false
							? inputs[`${objeto.nameTextArea}_${objeto.id}`]?.campoValido
								? "formulario__grupo formulario__grupo-correcto"
								: "formulario__grupo"
							: "formulario__grupo formulario__grupo-incorrecto"
					}
					id={objeto.divIdGrupo}
				>
					<label
						htmlFor={`${objeto.labelHtmlFor}_${objeto.id}`}
						className={objeto.labelClassName}
					>
						{objeto.labelText}
					</label>

					<div className={objeto.divClassNameFormularioGrupoInput}>
						<textarea
							id={`${objeto.textAreaId}_${objeto.id}`}
							name={`${objeto.nameTextArea}_${objeto.id}`}
							value={
								inputs[`${objeto.nameTextArea}_${objeto.id}`]?.valor ===
								undefined
									? inicializarTextArea(
											objeto.valorInicial,
											`${objeto.nameTextArea}_${objeto.id}`
									  )
									: inputs[`${objeto.nameTextArea}_${objeto.id}`].valor
							}
							onChange={(e) => handleInputsChange(e, cargarCampos, campoValido)}
							onBlur={(e) => handleInputsChange(e, cargarCampos, campoValido)}
							className={
								inputs[`${objeto.nameTextArea}_${objeto.id}`]?.campoValido
									? `${objeto.textAreaClassName} formulario__input-check`
									: objeto.textAreaClassName
							}
							rows={objeto.textAreaRow}
							placeholder={objeto.textAreaPlaceHolder}
							required
						/>

						<i className="d-flex align-items-center formulario__validacion-estado">
							<EtiquetaFontAwesomeIcon
								objectArray={{
									fontAwesomeIcon_CallComponentBool: true,
									fontAwesomeIcon_className: "fas",
									fontAwesomeIcon_icon: inputs[
										`${objeto.nameTextArea}_${objeto.id}`
									]?.campoValido
										? faCheckCircle
										: faTimesCircle,
								}}
							/>
						</i>
					</div>
					<p
						className={
							!inputs[`${objeto.nameTextArea}_${objeto.id}`]?.saber &&
							inputs[`${objeto.nameTextArea}_${objeto.id}`]?.error?.error1
								? "invalid-feedback formulario__input-error1-activo"
								: "invalid-feedback formulario__input-error1"
						}
					>
						{objeto.pFormularioInputError1Texto}
					</p>
					<p
						className={
							!inputs[`${objeto.nameTextArea}_${objeto.id}`]?.saber &&
							inputs[`${objeto.nameTextArea}_${objeto.id}`]?.error?.error
								? "invalid-feedback formulario__input-error-activo"
								: "invalid-feedback formulario__input-error"
						}
					>
						{objeto.pFormularioInputErrorTexto}
					</p>
				</div>
			</>
		);
	}
	return null;
};

export default EtiquetaTextArea;
