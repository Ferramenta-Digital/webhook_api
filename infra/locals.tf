locals {
  settings = {
    maxScale : "10",
    minScale : "0",
    maxMemory : "256Mi",
    maxCPU : "1000m",
    containerConcurrency : 200,
    timeoutSeconds : 90,
  }
}

locals {
  secrets = {}
}
