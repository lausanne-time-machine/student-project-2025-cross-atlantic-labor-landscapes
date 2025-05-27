import {LatLngExpression} from 'leaflet';
import Ellipse from './Ellipse';

interface EllipseFromCovProps {
  center: LatLngExpression;
  sigma: number[][];
  options?: any;
}


function getEllipseProps(props:EllipseFromCovProps){
  const { center, sigma, options } = props;

  let c = sigma[0][0] * 1e10;
  let b = sigma[0][1] * 1e10;
  let a = sigma[1][1] * 1e10;

  const r1 = Math.sqrt((a + c)/2.0 +  Math.sqrt(Math.pow((a - c)/2.0, 2) + Math.pow(b, 2)))
  const r2 = Math.sqrt((a + c)/2.0 -  Math.sqrt(Math.pow((a - c)/2.0, 2) + Math.pow(b, 2)))

  let tilt = 0
  
  if (b == 0){
    if (a < c){
      tilt = -Math.PI/2
    }
  }else{
    tilt = -Math.atan2(Math.pow(r1, 2) - a, b)
  }

  tilt = tilt * 180 / Math.PI
  let ellipseProps = {center: center, radii: [r1, r2], tilt: tilt, options: options}
  return ellipseProps
}


export default function EllipseFromCov(props:EllipseFromCovProps){
  
  let ellipseProps = getEllipseProps(props);
  return <Ellipse center={ellipseProps.center} radii={ellipseProps.radii} tilt={ellipseProps.tilt} options={ellipseProps.options} />
  
}