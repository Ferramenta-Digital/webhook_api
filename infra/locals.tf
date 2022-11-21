locals {
  settings = {
    maxScale : "50",
    minScale : "0",
    maxMemory : "512Mi",
    maxCPU : "1000m",
    containerConcurrency : 200,
    timeoutSeconds : 90,
    vpcConnector : "projects/${var.gcp_project_id}/locations/${var.gcp_region}/connectors/${var.vpc_connector}",
  }
}

locals {
  secrets = {}
}
