module.exports = {
  apps: [{
    name: "Server Cluster",
    script: "index.js",
    args: "3030",
    instances: "max",
    exec_mode: "cluster"
  }]
}