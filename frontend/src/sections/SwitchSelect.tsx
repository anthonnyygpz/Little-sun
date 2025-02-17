// import React from 'react';
// import Switch from '@material-ui/core/Switch';
// import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import ContainerSection from '../components/ContainerSection';
// import SubTittle from '../components/SubTittle';
//
// interface SwitchSelectProps {
//   onChange: (value: boolean, index: number) => void; // Cambiado para enviar el índice también
// }
//
// const SwitchSelect: React.FC<SwitchSelectProps> = ({ onChange }) => {
//   const [checked, setChecked] = React.useState(false);
//
//   const nameSwitch = ["Tamaño de esculpido", "Servicios", "Diseños"];
//
//   const toggleChecked = (index: number) => {
//     const newValue = !checked[index]; // Calcula el nuevo valor antes de actualizar el estado
//     setChecked((prev) => ({
//       ...prev,
//       [index]: newValue,
//     }));
//     onChange(newValue, index); // Envía el nuevo valor y el índice
//   };
//
//   return (
//     <ContainerSection>
//       <SubTittle text='Activar para actualizar' />
//       {nameSwitch.map((name, index) => (
//         <div key={index}>
//           <FormGroup>
//             <FormControlLabel
//               control={
//                 <Switch
//                   color='primary'
//                   checked={checked[index]}
//                   onChange={() => toggleChecked(index)}
//                 />
//               }
//               label={name}
//             />
//           </FormGroup>
//         </div>
//       ))}
//     </ContainerSection>
//   );
// };
//
// export default SwitchSelect;
