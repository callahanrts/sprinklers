PIN=$1
SLEEP=$2

if [ -z "$SLEEP" ]; then
  SLEEP=3s
fi

echo "Start pin $PIN for $SLEEP"

#   Exports pin to userspace
echo $PIN > /sys/class/gpio/export                  

# Sets pin PIN as an output
echo "out" > /sys/class/gpio/gpio$PIN/direction

# Sets pin $PIN to low
echo "0" > /sys/class/gpio/gpio$PIN/value 

sleep $SLEEP

# Sets pin $PIN to high
echo "1" > /sys/class/gpio/gpio$PIN/value

