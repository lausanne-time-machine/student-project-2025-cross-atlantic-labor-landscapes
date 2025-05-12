import {LatLngExpression} from 'leaflet';
import Ellipse from './Ellipse';

interface EllipseFromCovProps {
  center: LatLngExpression;
  sigma: number[][];
  options?: any;
}


function getEllipseProps(props:EllipseFromCovProps){
  const { center, sigma, options } = props;
  const r1 = Math.sqrt((sigma[0][0] + sigma[1][1])/2.0 +  Math.sqrt(Math.pow((sigma[0][0] - sigma[1][1])/2.0, 2) + Math.pow(sigma[0][1], 2)))
  const r2 = Math.sqrt((sigma[0][0] + sigma[1][1])/2.0 -  Math.sqrt(Math.pow((sigma[0][0] - sigma[1][1])/2.0, 2) + Math.pow(sigma[0][1], 2)))

  let tilt = 0
  
  if (sigma[0][1] == 0){
    if (sigma[0][0] < sigma[1][1]){
      tilt = Math.PI/2
    }
  }else{
    tilt = Math.atan2(Math.pow(r1, 2) - sigma[0][0], sigma[0][1])
  }

  tilt = tilt * 180 / Math.PI
  let ellipseProps = {center: center, radii: [r1, r2], tilt: tilt, options: options}
  return ellipseProps
}


export default function EllipseFromCov(props:EllipseFromCovProps){
  
  let ellipseProps = getEllipseProps(props);
  return <Ellipse center={ellipseProps.center} radii={ellipseProps.radii} tilt={ellipseProps.tilt} options={ellipseProps.options} />
  
}