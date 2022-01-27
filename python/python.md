# Using NVH in Python

There is a parser, merger, splitter and schema generator and validator available all in one Python script available for easy use with no additional dependencies: [nvh.py](nvh.py)

## Usage overview
```
>./nvh.py
Usage:
./nvh.py get DB [ SELECT_FILTER [ PROJECT_FILTER ]]
./nvh.py put DB PATCH_DB [ REPLACE_FILTER ]
./nvh.py split file.nvh OUTPUT_DIRECTORY
./nvh.py genschema file.nvh
./nvh.py checkschema file.nvh schema.nvh
DB is a file in NVH format
FILTER is a dot-notated path to a name, multiple FILTERs can be comma-separated and are ANDed
SELECT_FILTER supports equality, non-equality, Python regexp testing and count (#)
Examples:
./nvh.py get file.nvh
./nvh.py get file.nvh hw.sense hw.pos,hw.form
./nvh.py get file.nvh hw.form=blaming hw.pos,hw.form
./nvh.py get file.nvh hw.form!=blaming hw.pos,hw.form
./nvh.py get file.nvh hw.form~="blam.*" w.pos,hw.form
./nvh.py get file.nvh 'hw.sense.example#=0' hw.sense
./nvh.py get file.nvh 'hw.sense.example#>0.quality=bad' hw.sense
./nvh.py put file.nvh patch.nvh hw.sense
```

## Searching an NVH file

Search is done using the `nvh.py get FILE` command. It takes two optional arguments following the notions of projections and selections as used in relational databases.
The selection represents criteria applied to filter entries to be retrieved whereas the projection represents which parts of the (pre-selected) entries will be retrieved.
Both use a dot-notation:

```
hw: blame-v
    lemma: blame
    pos: verb
    freq: 1517
    form: blaming
        features: gerundium
        freq: 308
    sense: declare responsibility
```

The `features` node is identified as `hw.form.features`.

### Examples

#### Plain retrieval

```
nvh.py get file.nvh
```

Retrieve the whole `file.nvh`. This equals `cat file.nvh`.

```
nvh.py get file.nvh hw.sense hw.pos,hw.form
```

Select only entries having `hw.sense` and from those display only `hw.pos` and `hw.form` as well as their ancestors and descendants.
On the above example, this would return:

```
hw: blame-v
    pos: verb
    form: blaming
        features: gerundium
        freq: 308
```

#### String equality

```
nvh.py get file.nvh hw.form=blaming hw.pos,hw.form
```

Select only entries having `hw.form` equal to the string `blaming` and from those display only `hw.pos` and `hw.form`.
On the above example, this would return the same as the previous query.

#### Regular expression matching

```
nvh.py get file.nvh hw.form~="blam.*" w.pos,hw.form
```

Select only entries having `hw.form` matching the regular expression `blaming` and from those display only `hw.pos` and `hw.form`.
On the above example, this would return the same as the previous query.

#### Negation

```
nvh.py get file.nvh hw.form!=blaming hw.pos,hw.form
```

Select only entries having `hw.form` not equal to the string `blaming` and from those display only `hw.pos` and `hw.form`.
On the above example, this would return empty result.

#### Counting elements

```
nvh.py get file.nvh 'hw.sense.example#=0' hw.sense
```

Select only entries having no `example` under `hw.sense` and from those display only `hw.sense`.
On the above example, this would return:

```
hw: blame-v
    sense: declare responsibility
```

```
nvh.py get file.nvh 'hw.sense.example#>0.quality=bad' hw.sense
```

Select only entries having at least one `example` under `hw.sense` which has `quality` equal to the string `bad`; and from those display only `hw.sense`.

#### Selecting first N elements

If you put ##number as the first item in select filters, only the first number items will be returned:
```
nvh.py get file.nvh '##3,hw.sense'
```
Select first three elements having `hw.sense`.

#### Making projection elements obligatory

If you put an exclamation mark right after a projection, it means the projection must be present, e.g. in

```
nvh.py get file.nvh 'hw.sense.example.quality=good,hw.sense.example.quality=bad' hw.sense,hw.flag
```

the two conditions can be met by different senses, so no sense is actually returned. If you want to only include senses that meet both conditions, use this:

```
nvh.py get file.nvh 'hw.sense.example.quality=good,hw.sense.example.quality=bad' 'hw.sense!,hw.flag'
```

## Merging two NVH files

The `nvh.py put DB PATCH_DB` command merges the `PATCH_DB` NVH file into the `DB` NVH file. It takes an optional argument representing replacing filters indicating which say which elements of the `PATCH_DB` NVH file should be actually merged.

```
nvh.py put file.nvh patch.nvh hw.sense.example
```

Replace all the `hw.sense.example` for all the `hw.sense` in `file.nvh` with those present in `patch.nvh`, i.e. the `file.nvh` will only contain the items present in `patch.nvh`.

If you put an exclamation mark right after a replace filter in nvh put, it will replace only these elements whose values are present in the data, i.e. this:

```
nvh.py put tagalog.nvh patch.nvh hw.sense.example!
```

will only replace the examples whose values are present in ```patch.nvh```, and will keep all the others (even if they are not present in ```patch.nvh```).

## Splitting an NVH file

The command `nvh.py split file.nvh OUTPUT_DIRECTORY` splits the `file.nvh` into separate files in the `OUTPUT_DIRECTORY`, each file named and having content according to the top-level element in `file.nvh`.

## Schema generation

The command `nvh.py genschema file.nvh` generates a [schema file](../docs/schema.md) (which itself is in the NVH format) according to the contents of the `file.nvh`.

## Schema validation

The command `nvh.py checkschema file.nvh schema.nvh` validates `file.nvh` against a [schema](../docs/schema.md) in `schema.nvh`.

## Transformation to XML

The tool `nvh2xml.py` is a generic NVH to XML convertor, uses `nvh.py` and exports node values as attributes. It reads from standard input. The above example would transform as follows:

```
>./nvh2xml.py < test.nvh
<?xml version="1.0"?>
<dictionary>
  <hw v="blame-v">
    <lemma v="blame" />
    <pos v="verb" />
    <freq v="1517" />
    <form v="blaming">
      <features v="gerundium" />
      <freq v="308" />
    </form>
    <sense v="declare responsibility" />
  </hw>
</dictionary>
```

