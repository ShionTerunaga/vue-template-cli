import os
import shutil
import subprocess
from common import node_path, resolve_repo_root
from runner import get_actions, run_actions


def resolve_cli_cmd(repo_root):
    cli_entry = os.path.join(repo_root, "bin", "index.mjs")
    return [node_path(), cli_entry]


def print_cli_version(repo_root):
    cli_entry = resolve_cli_cmd(repo_root)
    subprocess.run(cli_entry + ["-v"], check=True)


def run_cli(repo_root, workdir):
    cli_entry = resolve_cli_cmd(repo_root)
    run_actions(get_actions(), cli_entry, workdir)


def main():
    repo_root = resolve_repo_root()
    print_cli_version(repo_root)

    app_root = os.path.join(repo_root, "test", "auto", "app")
    print(f"[auto] Cleaning app root: {app_root}")
    shutil.rmtree(app_root, ignore_errors=True)
    os.makedirs(app_root, exist_ok=True)

    run_cli(repo_root, app_root)


if __name__ == "__main__":
    main()
