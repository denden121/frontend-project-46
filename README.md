### Hexlet tests and linter status:
[![Actions Status](https://github.com/denden121/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/denden121/frontend-project-46/actions)

### CI (lint + tests):
[![CI](https://github.com/denden121/frontend-project-46/actions/workflows/ci.yml/badge.svg)](https://github.com/denden121/frontend-project-46/actions/workflows/ci.yml)

### Test Coverage (SonarCloud):
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=denden121_frontend-project-46&metric=coverage)](https://sonarcloud.io/summary/new_code?project=denden121_frontend-project-46)


### Использование


CLI:
```bash
gendiff filepath1.json filepath2.json
gendiff --format plain filepath1.json filepath2.json
gendiff --format json filepath1.json filepath2.json
```

Формат **json** выдаёт диф в виде массива JSON-объектов (узлы с `key`, `type`, при необходимости `value`, `oldValue`, `children`).

### Пример работы пакета (asciinema)

Пример работы утилиты: [asciinema](https://asciinema.org/a/ojiIgqxlF1nWmj0u)