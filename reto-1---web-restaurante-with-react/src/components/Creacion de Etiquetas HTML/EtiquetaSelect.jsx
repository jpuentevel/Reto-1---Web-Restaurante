import {
	faCheckCircle,
	faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import React, { useContext } from "react";
import CantidadContext from "../../contexts/Inputs/InputsContext";
import EtiquetaFontAwesomeIcon from "../FontAwesome/EtiquetaFontAwesomeIcon";
import { handleInputsChange } from "../Inputs/ValidacionCampos";

const EtiquetaSelect = ({ objeto }) => {
	const { inputs, cargarCampos, campoValido } = useContext(CantidadContext);

	const inicializarSelect = (valorInicial, nombreInput) => {
		if (inputs[nombreInput]?.valor === undefined) {
			cargarCampos(valorInicial, nombreInput, false, {
				error: false,
				error1: false,
			});
		}
	};

	if (objeto.select_CallComponentBool) {
		return (
			<>
				<div
					className={
						inputs[`${objeto.nameSelect}_${objeto.id}`]?.error.error ===
							false &&
						inputs[`${objeto.nameSelect}_${objeto.id}`]?.error.error1 === false
							? inputs[`${objeto.nameSelect}_${objeto.id}`]?.campoValido
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
						<select
							id={objeto.selectId}
							name={`${objeto.nameSelect}_${objeto.id}`}
							value={
								inputs[`${objeto.nameSelect}_${objeto.id}`]?.valor === undefined
									? inicializarSelect(
											objeto.valorInicial,
											`${objeto.nameSelect}_${objeto.id}`
									  )
									: inputs[`${objeto.nameSelect}_${objeto.id}`].valor
							}
							onChange={(e) => handleInputsChange(e, cargarCampos, campoValido)}
							onBlur={(e) => handleInputsChange(e, cargarCampos, campoValido)}
							className={
								inputs[`${objeto.nameSelect}_${objeto.id}`]?.campoValido
									? `${objeto.selectClassName} formulario__input-check`
									: objeto.selectClassName
							}
							required
						>
							<option value="" disabled>
								SELECCIONE...
							</option>
							{objeto.opcionesSelect.map((opcion, index) => {
								return (
									<option key={index} value={opcion.value}>
										{opcion.value}
									</option>
								);
							})}
						</select>
						<i className="d-flex align-items-center formulario__validacion-estado">
							<EtiquetaFontAwesomeIcon
								objectArray={{
									fontAwesomeIcon_CallComponentBool: true,
									fontAwesomeIcon_className: "fas",
									fontAwesomeIcon_icon: inputs[
										`${objeto.nameSelect}_${objeto.id}` /* `input_cantidad_${plato.idPlato}` */
									]?.campoValido
										? faCheckCircle
										: faTimesCircle,
								}}
							/>
						</i>
					</div>
					<p
						className={
							!inputs[
								`${objeto.nameSelect}_${objeto.id}` /* `input_cantidad_${plato.idPlato}` */
							]?.saber &&
							inputs[
								`${objeto.nameSelect}_${objeto.id}` /* `input_cantidad_${plato.idPlato}` */
							]?.error?.error1
								? "invalid-feedback formulario__input-error1-activo"
								: "invalid-feedback formulario__input-error1"
						}
					>
						{objeto.pFormularioInputError1Texto}
					</p>
					<p
						className={
							!inputs[
								`${objeto.nameSelect}_${objeto.id}` /* `input_cantidad_${plato.idPlato}` */
							]?.saber &&
							inputs[
								`${objeto.nameSelect}_${objeto.id}` /* `input_cantidad_${plato.idPlato}` */
							]?.error?.error
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
	return <></>;
};

export default EtiquetaSelect;
