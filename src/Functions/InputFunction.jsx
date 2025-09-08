import { InputRenderers } from "./InputRender"

export function InputFunctions(funBy) {
  if (!funBy || funBy.length === 0) return null;

  return funBy.map((ipVal, i) => {
    const Renderer = InputRenderers[ipVal?.type] || InputRenderers[ipVal?.category]
    if (!Renderer) return null

    return (
      <div className={ipVal?.divClassName} key={i}>
        {Renderer(ipVal)}
        {ipVal?.Err && <div className="text-danger pt-2 ps-1 fs-15">{ipVal?.Err}</div>}
      </div>
    );
  });
}