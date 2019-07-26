# export-gitea-org

## Requirements

- Verified to work with Gitea v1.9
- Nodejs v10+

## Usage

Download and install this package:

```shell
$ npm i -g @narando/export-gitea-org
```

Configure access to your Gitea Instance:

```shell
$ export GITEA_HOST=https://gitea.example.com
$ export GITEA_TOKEN=YOUR_TOKEN_HERE
```

Declare which organization you want to export:

```shell
$ export ORGANIZATION=YOUR_ORG
```

Run the script, this might take between 5-15 minutes without any output.

```shell
$ export-gitea-org
```

**Congratulations!** You can now find all issues sorted by repository in the folder `./exports`.