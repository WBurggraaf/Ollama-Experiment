from flask import Flask, jsonify
from datetime import datetime
import pynvml

app = Flask(__name__)

# Initialize NVML once
try:
    pynvml.nvmlInit()
    handle = pynvml.nvmlDeviceGetHandleByIndex(0)
    print("NVML Initialized Successfully")
except pynvml.NVMLError as e:
    handle = None
    print("NVML Initialization Error:", str(e))

@app.route('/power_usage')
def get_power_usage():
    if handle is None:
        return jsonify({"error": "NVML is uninitialized or failed to access GPU"}), 500
    try:
        # Get current power usage in watts
        power = pynvml.nvmlDeviceGetPowerUsage(handle) / 1000  # Convert mW to W
        power_joules_per_ms = power * 0.001  # Convert W to J/ms
        current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f')[:-3]
        return jsonify({
            "timestamp": current_time,
            "power_usage_W": round(power, 1),
            "power_usage_J_per_ms": round(power_joules_per_ms, 4)
        })
    except pynvml.NVMLError as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3050)
