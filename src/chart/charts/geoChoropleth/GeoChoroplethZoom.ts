/// <reference path="../../../references.ts"/>

class GeoChoroplethZoom {

    private static RADIANS = Math.PI / 180;
    private static DEGREES = 180 / Math.PI;

    public projection: D3.Geo.Projection;
    public zoomPoint: number[];
    public event: D3.Dispatch = d3.dispatch('zoomstart', 'zoom', 'zoomend');
    public zoom: D3.Behavior.Zoom = d3.behavior.zoom().on('zoomstart', () => {
        if (!this.projection.rotate) {
            return;
        }
        var mouse: number[] = d3.mouse(this);
        var rotate: number[] = GeoChoroplethZoom.quaternionFromEuler(this.projection.rotate());
        var point: number[] = GeoChoroplethZoom.position(this.projection, mouse);
        if (point) {
            this.zoomPoint = point;
        }
    });

    private static cartesian(spherical: number[]): number[] {
        var λ = spherical[0] * GeoChoroplethZoom.RADIANS;
        var φ = spherical[1] * GeoChoroplethZoom.RADIANS;
        var cosφ = Math.cos(φ);
        return [cosφ * Math.cos(λ), cosφ * Math.sin(λ), Math.sin(φ)];
    }

    private static dot(a: number[], b: number[]): number {
        var n: number = a.length;
        var s: number = 0;
        for (var i = 0; i < n; ++i) {
            s += a[i] * b[i];
        }
        return s;
    }

    private static cross(a: number[], b: number[]): number[] {
        return [
            a[1] * b[2] - a[2] * b[1],
            a[2] * b[0] - a[0] * b[2],
            a[0] * b[1] - a[1] * b[0]
        ];
    }

    private static bank(projection: D3.Geo.Projection, p0: number[], p1: number[]): number[] {
        var t: number[] = projection.translate();
        var angle: number = Math.atan2(p0[1] - t[1], p0[0] - t[0]) - Math.atan2(p1[1] - t[1], p1[0] - t[0]);
        return [Math.cos(angle / 2), 0, 0, Math.sin(angle / 2)];
    }

    private static position(projection: D3.Geo.Projection, point: number[]): number[] {
        var spherical = projection.invert(point);
        return spherical && isFinite(spherical[0]) && isFinite(spherical[1]) && GeoChoroplethZoom.cartesian(spherical);
    }

    private static quaternionFromEuler(euler: number[]): number[] {
        var λ = 0.5 * euler[0] * GeoChoroplethZoom.RADIANS,
            φ = 0.5 * euler[1] * GeoChoroplethZoom.RADIANS,
            γ = 0.5 * euler[2] * GeoChoroplethZoom.RADIANS,
            sinλ = Math.sin(λ), cosλ = Math.cos(λ),
            sinφ = Math.sin(φ), cosφ = Math.cos(φ),
            sinγ = Math.sin(γ), cosγ = Math.cos(γ);
        return [
            cosλ * cosφ * cosγ + sinλ * sinφ * sinγ,
            sinλ * cosφ * cosγ - cosλ * sinφ * sinγ,
            cosλ * sinφ * cosγ + sinλ * cosφ * sinγ,
            cosλ * cosφ * sinγ - sinλ * sinφ * cosγ
        ];
    }

    private static multiple(a: number[], b: number[]): number[] {
        var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
            b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
        return [
            a0 * b0 - a1 * b1 - a2 * b2 - a3 * b3,
            a0 * b1 + a1 * b0 + a2 * b3 - a3 * b2,
            a0 * b2 - a1 * b3 + a2 * b0 + a3 * b1,
            a0 * b3 + a1 * b2 - a2 * b1 + a3 * b0
        ];
    }

    private static rotateBetween (a: number[], b: number[]): number[] {
        if (!a || !b) {
            return null;
        }
        var axis = GeoChoroplethZoom.cross(a, b),
            norm = Math.sqrt(GeoChoroplethZoom.dot(axis, axis)),
            halfγ = 0.5 * Math.acos(Math.max(-1, Math.min(1, GeoChoroplethZoom.dot(a, b)))),
            k = Math.sin(halfγ) / norm;
        return norm && [Math.cos(halfγ), axis[2] * k, -axis[1] * k, axis[0] * k];
    }

    private static eulerFromQuaternion(q: number[]) {
        return [
            Math.atan2(2 * (q[0] * q[1] + q[2] * q[3]), 1 - 2 * (q[1] * q[1] + q[2] * q[2])) * GeoChoroplethZoom.DEGREES,
            Math.asin(Math.max(-1, Math.min(1, 2 * (q[0] * q[2] - q[3] * q[1])))) * GeoChoroplethZoom.DEGREES,
            Math.atan2(2 * (q[0] * q[3] + q[1] * q[2]), 1 - 2 * (q[2] * q[2] + q[3] * q[3])) * GeoChoroplethZoom.DEGREES
        ];
    }
}
export = GeoChoroplethZoom;
