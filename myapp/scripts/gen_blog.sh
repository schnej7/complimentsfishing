#!/bin/bash

BLOG_INDEX=views/blog.jade
BLOG_INDEX_TEMPLATE=view_templates/blog.jade

BLOGS_DIR=views/blog
BLOG_DATA_FILE=/tmp/blog_data.txt
BLOG_DATA_FILE_SORTED=/tmp/blog_data_sorted.txt

echo '' > $BLOG_DATA_FILE
echo '' > $BLOG_DATA_FILE_SORTED

for file in $(ls $BLOGS_DIR)
do
    FILENAME=$(echo $file | sed "s/.jade//g")
    DATE_LINE=$(cat $BLOGS_DIR/$file | grep "^\( \)*+date" | sed "s/.*(//g" | sed "s/).*//g")
    TITLE=$(cat $BLOGS_DIR/$file | grep -A1 "blogTitle" | tail -n 1 | sed "s/.*|//g")
    YEAR=$(echo $DATE_LINE | awk '{print $1}' | grep -o [0-9]*)
    MONTH=$(echo $DATE_LINE | awk '{print $2}' | grep -o [0-9]*)
    DAY=$(echo $DATE_LINE | awk '{print $3}' | grep -o [0-9]*)
 
    re='^[0-9]+$'
    if [[ $YEAR =~ $re && $MONTH =~ $re && $DAY =~ $re ]] ; then
        DAYS=$((365 * $YEAR + 30 * $MONTH + $DAY))
        echo "$DAYS |xxx $FILENAME | $TITLE" >> $BLOG_DATA_FILE
        echo "$FILENAME | $TITLE | $YEAR | $MONTH | $DAY | $DAYS"
    fi

done

cat $BLOG_DATA_FILE | sort -t \| -k 1 -g >> $BLOG_DATA_FILE_SORTED
cp $BLOG_INDEX_TEMPLATE $BLOG_INDEX

cat $BLOG_DATA_FILE_SORTED | while read line
do
    if [[ $line ]]; then
        CLEAN_LINE=$(echo $line | sed "s/.*|xxx//g")
        TITLE=$(echo $CLEAN_LINE | sed "s/.*|//g")
        TEMPLATE=$(echo $CLEAN_LINE | sed "s/|.*//g")
        echo "             +blogLink('$TITLE','/blog/$TEMPLATE')" >> $BLOG_INDEX
    fi
done

exit 0
