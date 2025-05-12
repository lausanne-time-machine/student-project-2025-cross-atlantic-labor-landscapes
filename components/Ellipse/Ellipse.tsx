import { createPathComponent, PathProps } from '@react-leaflet/core';
import {LatLngExpression} from 'leaflet';
import * as L from "leaflet";
import 'leaflet-ellipse';


interface ellipseProps extends PathProps{
  center: LatLngExpression;
  radii: number[];
  tilt: number;
  options: any;
}

function createEllipse(props:ellipseProps, context:any) {
  const { center, radii, tilt, options } = props;

  // @ts-ignore
  const instance  = new L.ellipse(center, radii, tilt, options);
  return {
    instance,
    context: { ...context, overlayContainer: instance },
  };
}

// Update state:
function updateEllipse(instance:any, props:ellipseProps, prevProps:ellipseProps) {
  if (
    props.center !== prevProps.center ||
    props.radii !== prevProps.radii ||
    props.tilt !== prevProps.tilt ||
    props.options !== prevProps.options
  ) {
    instance.setStyle(props.options);
    instance.setLatLng(props.center);
    instance.setRadius(props.radii);
    instance.setTilt(props.tilt);
  }
}

// Create our component with the React-Leaflet Higher-Level Component Factory,
// the createPathComponent hook. This hook combines the createElementHook, createPathHook,
// and createContainerComponent hooks from the React-Leaflet Core Api:
// const Ellipse = createPathComponent(createEllipse, updateEllipse);
const Ellipse = createPathComponent<L.Polygon, ellipseProps>(createEllipse, updateEllipse);


export default Ellipse;
