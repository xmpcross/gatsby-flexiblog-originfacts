const fs = require(`fs`);
const path = require(`path`);
const { spawnSync } = require(`child_process`);

const developProcess = require(`gatsby/dist/commands/develop-process`);

const args = process.argv.slice(2);

if (args.includes(`--help`) || args.includes(`-h`) || args.includes(`--version`) || args.includes(`-v`)) {
  const result = spawnSync(`gatsby.cmd`, [`develop`, ...args], {
    stdio: `inherit`,
    shell: true,
  });

  process.exit(result.status ?? 0);
}

const program = {
  directory: process.cwd(),
  host: `localhost`,
  port: `8000`,
  proxyPort: `8000`,
  open: false,
  https: false,
  verbose: false,
  graphqlTracing: false,
  openTracingConfigFile: undefined,
  certFile: ``,
  keyFile: ``,
  caFile: ``,
  sitePackageJson: require(path.join(process.cwd(), `package.json`)),
};

for (let i = 0; i < args.length; i += 1) {
  const arg = args[i];

  if (arg === `--host` || arg === `-H`) {
    program.host = args[i + 1];
    i += 1;
    continue;
  }

  if (arg.startsWith(`--host=`)) {
    program.host = arg.slice(`--host=`.length);
    continue;
  }

  if (arg === `--port` || arg === `-p`) {
    program.port = args[i + 1];
    program.proxyPort = args[i + 1];
    i += 1;
    continue;
  }

  if (arg.startsWith(`--port=`)) {
    program.port = arg.slice(`--port=`.length);
    program.proxyPort = program.port;
    continue;
  }

  if (arg === `--open` || arg === `-o`) {
    program.open = true;
    continue;
  }

  if (arg === `--https` || arg === `-S`) {
    program.https = true;
    continue;
  }

  if (arg === `--verbose`) {
    program.verbose = true;
    continue;
  }

  if (arg === `--graphql-tracing`) {
    program.graphqlTracing = true;
    continue;
  }

  if (arg === `--open-tracing-config-file`) {
    program.openTracingConfigFile = args[i + 1];
    i += 1;
    continue;
  }

  if (arg.startsWith(`--open-tracing-config-file=`)) {
    program.openTracingConfigFile = arg.slice(`--open-tracing-config-file=`.length);
    continue;
  }

  if (arg === `--cert-file` || arg === `-c`) {
    program.certFile = args[i + 1];
    i += 1;
    continue;
  }

  if (arg.startsWith(`--cert-file=`)) {
    program.certFile = arg.slice(`--cert-file=`.length);
    continue;
  }

  if (arg === `--key-file` || arg === `-k`) {
    program.keyFile = args[i + 1];
    i += 1;
    continue;
  }

  if (arg.startsWith(`--key-file=`)) {
    program.keyFile = arg.slice(`--key-file=`.length);
    continue;
  }

  if (arg === `--ca-file`) {
    program.caFile = args[i + 1];
    i += 1;
    continue;
  }

  if (arg.startsWith(`--ca-file=`)) {
    program.caFile = arg.slice(`--ca-file=`.length);
  }
}

fs.mkdirSync(path.join(process.cwd(), `.cache`), { recursive: true });

Promise.resolve(developProcess(program)).catch(error => {
  console.error(error);
  process.exit(1);
});
