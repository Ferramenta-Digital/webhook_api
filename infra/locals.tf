locals {
  settings = {
    maxScale : "50",
    minScale : "0",
    maxMemory : "512Mi",
    maxCPU : "1000m",
    containerConcurrency : 200,
    timeoutSeconds : 90,
  }
}

locals {
  secrets = {}
}
