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

### Примеры работы (asciinema)

В хронологическом порядке по шагам проекта:

1. **CLI и сравнение плоских JSON** — [asciinema](https://asciinema.org/a/s2Q59nLGrsr176DK)
2. **Сравнение плоских файлов (YAML)** — [asciinema](https://asciinema.org/a/y6OeCUmhkiIcWYx4)
3. **Формат plain** — [asciinema](https://asciinema.org/a/TwV4nujK6qhrMD17)
4. **Формат json** — [asciinema](https://asciinema.org/a/ojiIgqxlF1nWmj0u)